import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

export default async function UserLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/');
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}