export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="bg-[url(/images/adminloginbg.png)] w-full h-screen bg-cover overflow-auto bg-no-repeat flex justify-center items-center lg:bg-left bg-top px-4"
    >
      {children}
    </section>
  );
}
