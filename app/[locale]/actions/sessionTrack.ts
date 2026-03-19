

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function trackUserSession() {
  try {
    const { userId } = await auth();

    if (!userId) return;

    const h = await headers();

    const ip = h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown";

    const userAgent = h.get("user-agent") || "";

    // Parse device
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const device = result.device.type || "desktop";
    const browser = result.browser.name || "unknown";
    const os = result.os.name || "unknown";

    // Get location
    let country = null;
    let city = null;

    try {
      const geo = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await geo.json();

      country = data.country_name;
      city = data.city;
    } catch (e) {
      console.log("Geo lookup failed");
    }

    //  Checking existing session (same device + ip)
    const existing = await prisma.userSession.findFirst({
      where: {
        user_id: userId,
        ip,
        userAgent,
      },
    });

    if (existing) {
      //  Updating activity
      await prisma.userSession.update({
        where: { id: existing.id },
        data: {
          lastActiveAt: new Date(),
        },
      });
    } else {
      // Creating new session
      await prisma.userSession.create({
        data: {
          user_id: userId,
          ip,
          country,
          city,
          userAgent,
          device,
          browser,
          os,
        },
      });
    }
  } catch (error) {
    console.error("Session tracking error:", error);
  }
}
