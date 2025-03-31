import SignUpButton from "./SignUpButton";

const Signup = () => {
  return (
    <div className="my-20 flex flex-col justify-center items-center space-y-8">
      <div className="text-2xl text-center lg:text-4xl">
        A <span className="font-bold italic">Still waiting</span> to
        <span className="font-bold italic bg-yellow-200 px-1 ml-2">
          Sign Up ?
        </span>
        </div>
        <div>
       <SignUpButton/>
        </div>
      
    </div>
  );
};

export default Signup;
