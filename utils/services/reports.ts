"use server";

import prisma from "@/lib/prisma";

export async function getReports() {
    try {
      const reports = await prisma.report.findMany({
        include: {
          product: {
            select: {
              id: true,
              product_name: true,
              avgRating: true,
              reviewCount: true,
              reportCount: true,
              status: true,
            },
          },
          farmer: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              avgRating: true,
              reviewCount: true,
              reportCount: true,
              status: true,
            },
          },
          reporter: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
  
      return { success: true, data: reports };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }