import { useField } from "formik";
export default function InputField({ label, ...props }) {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
    </>
  );
}
