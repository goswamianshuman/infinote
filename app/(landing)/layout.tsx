import Header from "./_components/header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
