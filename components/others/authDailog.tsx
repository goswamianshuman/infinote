import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { account } from "@/config/appwrite.config";

type DailogProps = {
  header: React.ReactNode;
};

export function AuthDailog(props: DailogProps) {
  const handleGoogleAuth = () => {
    try {
      account.createOAuth2Session(
        "google",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/",
        []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubAuth = () => {
    try {
      account.createOAuth2Session(
        "github",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/",
        []
      );
    } catch (error) {
      console.log(error);
    }
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
