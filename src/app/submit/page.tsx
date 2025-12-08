import SubmitProductForm from "@/components/SubmitProductForm";
import Navbar from "@/components/Navbar";

export default function SubmitPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto mt-10 px-6">
        <h1 className="text-2xl font-bold mb-6">Submit a New Product 🚀</h1>
        <SubmitProductForm />
      </main>
    </div>
  );
}
