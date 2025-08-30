import OderSidebar from "@/components/order/OderSidebar";
import OrderSumary from "@/components/order/OrderSumary";
import ToastContainer from "@/components/ui/ToastNotifications";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <div className=" md:flex">
        <OderSidebar />
        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>
        <OrderSumary />
      </div>

      <ToastContainer />
    </>

  );
}