const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="container mx-auto flex justify-center pt-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
