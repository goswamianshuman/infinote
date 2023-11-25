import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { signInAccount } from "@/libs/appwrite/api";

type DailogProps = {
  header: React.ReactNode;
};

export function AuthDailog(props: DailogProps) {
  const { toast } = useToast();

  const handleGoogleAuth = async () => {
    await signInAccount({ provider: "google" });
  };
  const handleGithubAuth = async () => {
    await signInAccount({ provider: "github" });
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
