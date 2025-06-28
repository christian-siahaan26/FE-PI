import { signUpFormSchema, SignUpFormType } from "@/lib/schema";
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
import { ROUTES, SignUpDefaultValues } from "@/utils/constants";
import useSignUp from "@/services/auth/mutations/use-signup";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignUpForm = () => {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: SignUpDefaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, error } = useSignUp();

  const navigate = useNavigate();

  function onSubmit(formData: SignUpFormType) {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          navigate("/auth/sign-in");
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Have an account?{" "}
          <Link
            className="text-blue-500 underline hover:text-blue-600 font-bold"
            to={ROUTES.LOGIN}
          >
            Sign In
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
