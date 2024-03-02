import { RecoilRoot } from "recoil";
import Navigation from "./src/navigation/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Navigation />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
