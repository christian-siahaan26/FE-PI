import { signInFormSchema, SignInFormType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { R_TOKEN, ROUTES, SignInDefaultValues } from "@/utils/constants";
import useSignIn from "@/services/auth/mutations/use-signin";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { saveUserData } from "@/utils/localStorageHelper";

const SignUpForm = () => {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: SignInDefaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending, error } = useSignIn();

  const navigate = useNavigate();

  function onSubmit(formData: SignInFormType) {
    mutate(formData, {
      onSuccess: async (data) => {
        if (data.success) {
          await new Promise((resolve) => {
            localStorage.setItem(R_TOKEN, data.data!);
            resolve("");
          });
          saveUserData("", "");
          navigate("/dashboard", { replace: true });
          window.location.reload();
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Don&apos;t have an account?{" "}
          <Link
            className="text-blue-500 underline hover:text-blue-600 font-bold"
            to={ROUTES.REGISTER}
          >
            Sign Up
          </Link>
        </p>
        <div className="text-center space-y-3">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Submitting.." : "Submit"}
          </Button>
          <span className="text-center text-red-500">{error?.message}</span>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
