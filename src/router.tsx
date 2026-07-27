import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundPage } from "./components/not-found-page";

export const getRouter = () => {
  // Instância por request (SSR-safe): um singleton de módulo vazaria cache
  // entre usuários no servidor.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Stale-While-Revalidate: 5 min servindo do cache sem rede, com
        // revalidação em segundo plano. Corta o "flash de skeleton" ao
        // navegar entre /ofertas, /cupons e a home.
        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        // Catálogo não muda ao voltar para a aba; evita refetch/TBT gratuito.
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
      },
    },
  });


  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFoundPage,
  });

  return router;
};
