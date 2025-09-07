import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";

export default async function AdminClientsPage() {
  await dbConnect();
  const clientes = await Customer.find({}, { passwordHash: 0 }).lean();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a className="text-gray-600 hover:text-gray-900" href="/">
                Ver Site
              </a>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 text-gray-800 bg-white rounded-lg shadow mt-8 mb-8">
        <h1 className="text-2xl font-bold mb-6">Clientes cadastrados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.length === 0 && (
            <div className="text-gray-500 text-center py-8 col-span-full">
              Nenhum cliente cadastrado.
            </div>
          )}
          {clientes.map((cliente: any) => (
            <div
              key={cliente._id}
              className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 border hover:shadow-lg transition-shadow"
            >
              <div className="font-bold text-lg text-blue-700 mb-2 uppercase">
                {cliente.name}
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="font-semibold">E-mail:</span> {cliente.email}
                </div>
                <div>
                  <span className="font-semibold">CPF/CNPJ:</span>{" "}
                  {cliente.cpfCnpj}
                </div>
                <div>
                  <span className="font-semibold">Telefone:</span>{" "}
                  {cliente.phone || "-"}
                </div>
                <div>
                  <span className="font-semibold">ID Asaas:</span>{" "}
                  {cliente.asaasId}
                </div>
                <div>
                  <span className="font-semibold">CEP:</span>{" "}
                  {cliente.address?.postalCode || "-"}
                </div>
                <div>
                  <span className="font-semibold">Número:</span>{" "}
                  {cliente.address?.addressNumber || "-"}
                </div>
                <div>
                  <span className="font-semibold">Complemento:</span>{" "}
                  {cliente.address?.complement || "-"}
                </div>
                <div>
                  <span className="font-semibold">Bairro:</span>{" "}
                  {cliente.address?.province || "-"}
                </div>
                <div>
                  <span className="font-semibold">Cidade:</span>{" "}
                  {cliente.address?.city || cliente.address?.cityName || "-"}
                </div>
                <div>
                  <span className="font-semibold">Estado:</span>{" "}
                  {cliente.address?.state || "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
