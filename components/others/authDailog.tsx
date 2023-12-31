import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signInAccount } from "@/libs/appwrite/api";

type DailogProps = {
  header: React.ReactNode;
};

export function AuthDailog(props: DailogProps) {
  const handleGoogleAuth = () => {
    signInAccount({ provider: "google" });
  };
  const handleGithubAuth = () => {
    signInAccount({ provider: "github" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.header}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl md:text-4xl font-semibold tracking-wide">
            Access <span className="pb-[4px] text-[#C024D6]">Infinote</span>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-y-3">
          <Button onClick={handleGoogleAuth}>Login with Google</Button>
          <Button onClick={handleGithubAuth}>Login with Github</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
