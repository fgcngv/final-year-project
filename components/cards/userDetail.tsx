

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { User, UserSession } from "@prisma/client";
import LoaderBtn from "../loaderBtn";
import DeleteDialog from "../dialog/deleteDialog";

interface userDetailProps {
  param: string;
  userData: User;
  userSession?: UserSession[];
}

function UserDetail({ param, userData, userSession }: userDetailProps) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const formatDate = (date?: Date | null) =>
    date ? formatter.format(new Date(date)) : "—";

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-6">
      
      {/* ================= USER INFO ================= */}
      <Card className="border shadow-md hover:shadow-lg transition-all dark:bg-gray-900">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            User Detail
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Registered: {formatDate(userData.created_at)}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {userData.first_name} {userData.last_name}
          </h1>

          <div className="space-y-1">
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {userData.address || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {userData.role}
              </span>
            </p>
            <p>
              <span className="font-semibold">Last Updated:</span>{" "}
              {formatDate(userData.updated_at)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <DeleteDialog deleteType="user" id={param} />
          <LoaderBtn btnName="Update User" />
          <LoaderBtn
            linkTo={`/admin/order/${userData.id}`}
            btnName="View Orders"
            className="bg-blue-700 hover:bg-blue-800"
          />
        </CardFooter>
      </Card>

      {/* ================= SESSION HISTORY ================= */}
      <Card className="border shadow-md dark:bg-gray-900">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Session History
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!userSession || userSession.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No session history available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <th className="p-2 border">Device</th>
                    <th className="p-2 border">Browser</th>
                    <th className="p-2 border">OS</th>
                    <th className="p-2 border">IP</th>
                    <th className="p-2 border">Location</th>
                    <th className="p-2 border">Last Active</th>
                    <th className="p-2 border">Created</th>
                  </tr>
                </thead>

                <tbody>
                  {userSession.map((session) => (
                    <tr
                      key={session.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="p-2 border capitalize">
                        {session.device || "desktop"}
                      </td>
                      <td className="p-2 border">{session.browser}</td>
                      <td className="p-2 border">{session.os}</td>
                      <td className="p-2 border text-xs">{session.ip}</td>
                      <td className="p-2 border">
                        {session.city || "-"}, {session.country || "-"}
                      </td>
                      <td className="p-2 border">
                        {formatDate(session.lastActiveAt)}
                      </td>
                      <td className="p-2 border">
                        {formatDate(session.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;