import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@prisma/client";

interface userDetailProps {
  param: string;
  userData: User;
}

function UserDetail({ param, userData }: userDetailProps) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Africa/Nairobi",
  });

  const formattedRegistrationDate = formatter.format(userData?.created_at);
  const formattedLastViewedDate = formatter.format(userData?.updated_at);

  return (
    <div className="max-w-3xl mx-auto my-8">
      <Card className="border shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl font-semibold">User Detail</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="text-gray-500 text-sm">
              Registration Date: {formattedRegistrationDate}
            </div>

            <h1 className="text-2xl font-bold">
              {userData?.first_name} {userData?.last_name}
            </h1>

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Email:</span> {userData?.email}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {userData?.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {userData?.role}
              </p>
              <p>
                <span className="font-semibold">Last Viewed:</span>{" "}
                {formattedLastViewedDate}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button variant="destructive">Delete User</Button>
          <Button variant="default">Update User</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserDetail;
