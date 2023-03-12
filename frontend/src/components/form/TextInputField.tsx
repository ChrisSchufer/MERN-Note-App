import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  as: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

function TextInputField({ name, label, as, register, registerOptions, error, ...props }: TextInputFieldProps) {
  let el;
  if (as === "input") {
    el = (
      <input
        id={name}
        className={`border focus:outline text-lg rounded-md transition-shadow duration-200 ease-in-out p-1 pl-3 py-2 ${
          error ? "shadow-customError" : "focus:shadow-custom"
        }`}
        {...props}
        {...register(name, registerOptions)}
      />
    );
  } else {
    el = (
      <textarea
        className="border p-1 text-lg rounded-md pl-3 py-2 focus:shadow-custom focus:outline transition-shadow duration-200 ease-in-out"
        id={name}
        {...props}
        {...register("text")}
      />
    );
  }

  return (
    <div className="flex flex-col mt-6 mx-4">
      <label
        className="text-xl mb-1"
        htmlFor={name}
      >
        {label} <span className="text-red-600 text-base font-semibold ml-2">{error?.message}</span>
      </label>
      {el}
    </div>
  );
}

export default TextInputField;
