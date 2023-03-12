import { useForm } from "react-hook-form";
import User from "../models/users";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import TextInputField from "./form/TextInputField";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}
function SignUpModal({ onDismiss, onSignUpSuccessful }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UsersApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div className="absolute inset-0 bg-black/80">
      <div>
        <div className="min-w-[300px] max-w-2xl bg-white mt-10 mx-auto flex flex-col rounded-md">
          <div className="flex">
            <h2 className="self-center text-3xl font-semibold ml-4">Sign Up</h2>
            <button
              onClick={() => {}}
              className="ml-auto mr-4 cursor-pointer inset border-[5px] border-transparent hover:border-gray-400/30 transition-all duration-300 ease-in-out text-2xl px-1 mx-1 my-3 rounded-lg"
            >
              ✖
            </button>
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              name="username"
              label="Username"
              as="input"
              type="text"
              placeholder="Username"
              register={register}
              registerOptions={{ required: "Required: Please enter a Username" }}
              error={errors.username}
            />

            <TextInputField
              name="email"
              label="Email"
              as="input"
              type="email"
              placeholder="example@gmail.com"
              register={register}
              registerOptions={{ required: "Required: Please enter an Email" }}
              error={errors.email}
            />

            <TextInputField
              name="password"
              label="Password"
              as="input"
              type="password"
              placeholder="Password"
              register={register}
              registerOptions={{ required: "Required: Please enter a Password" }}
              error={errors.password}
            />

            <hr className="mt-8" />

            <div className="flex text-white">
              <button
                disabled={isSubmitting}
                className="bg-blue-500 px-4 py-2 my-3 self-end rounded-md w-full mx-4 hover:bg-blue-600 transition-colors ease-in duration-150 active:scale-[.99]"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
