import SignInForm from "@/components/form/auth/SignInForm";
import Logo from "../../assets/guestList-logo.png";

const SignInPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="mb-8 flex">
        <img src={Logo} alt="Workify logo" className="inline-block w-20" />
        <span className="text-2xl font-semibold text-slate-800 ml-2">
          Guest List App
        </span>
      </div>
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-[6px_6px_0px_black] border-4 border-black">
        <h2 className="text-2xl font-bold text-black">Sign In</h2>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
