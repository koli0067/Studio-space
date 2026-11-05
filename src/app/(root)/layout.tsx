
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#121B16]">
      {children}
    </div>
  );
};

export default layout;
