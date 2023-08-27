import ProgressBar from "../ProgressBar/ProgressBar";

export default function ProgressAddAmound({ value }) {
  if (value >= 0) {
    return <ProgressBar bgcolor="red" progress={0}  />;
  }

  if (value > 1) {
    return (
      <ProgressBar bgcolor="#24cca7" progress={400} text={"Protection 100%"} />
    );
  }
  return null;
}
