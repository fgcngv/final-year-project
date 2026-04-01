"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { AlertTriangle, Loader, LocationEdit } from "lucide-react";
import { updateFarmerLocation } from "@/app/[locale]/actions/general";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function UpdateFarmLocationButton() {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const td = useTranslations("dialog");
  const router = useRouter();

  const handleConfirmUpdate = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await updateFarmerLocation({ latitude, longitude });

          if (res.success) {
            toast.success(td("success"));
          } else {
            toast.error(res.message as string || "Failed to update location");
          }
        } catch (err) {
          toast.error("Failed to update location");
          console.error(err);
        } finally {
          setLoading(false);
          setShowDialog(false);
          router.refresh();        }
      },
      () => {
        toast.error(
          "Unable to retrieve your location. Please allow location access and try again."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="z-10">
      {/* Button to trigger dialog */}
      <Button
        onClick={() => setShowDialog(true)}
        className="flex items-center gap-2 border-4 bg-green-900 text-white hover:bg-green-800"
      >
               <LocationEdit /> {loading ? td("updating") : td("update")} 
      </Button>

      {/* Dialog */}
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-center">{td("title")}</DialogTitle>
              <DialogDescription>
                <p className="text-lg flex flex-col items-center  font-bold text-start text-yellow-600 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 inline-block mr-1" />
                    {td("standInFarming")}</p>
                <br />
                <h2 className="text-xl text-amber-600 text-center">{td("areYouSure")}</h2>
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowDialog(false)}
              >
                {td("cancel")}
              </Button>
              <Button
                onClick={handleConfirmUpdate}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {loading ? "Updating..." : td("confirm")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}