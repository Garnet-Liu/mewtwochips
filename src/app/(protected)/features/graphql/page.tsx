import { Suspense } from "react";

import { Spin } from "@/components/spin";
import { Input } from "@/components/ui/input";
import { Book } from "@/components/graphql/book";
import { Books } from "@/components/graphql/books";
import { PreloadQuery } from "@/apollo/apollo-server";
import { AllPokemon } from "@/components/graphql/all-pokemon";
import { allPokemonQuery, bookQuery, booksQuery } from "@/apollo/client/query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Tabs defaultValue="books">
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="book">Book</TabsTrigger>
          <TabsTrigger value="allPokemon">All pokemon</TabsTrigger>
        </TabsList>

        <Input className="w-56" placeholder="Search pokemon name..." />
      </div>

      <TabsContent value="books">
        <PreloadQuery query={booksQuery}>
          {(queryRef) => (
            <Suspense fallback={<Spin className="h-6" loading={true} />}>
              <Books queryRef={queryRef} />
            </Suspense>
          )}
        </PreloadQuery>
      </TabsContent>

      <TabsContent value="book">
        <PreloadQuery query={bookQuery} variables={{ id: "1" }}>
          <Suspense fallback={<Spin className="h-6" loading={true} />}>
            <Book />
          </Suspense>
        </PreloadQuery>
      </TabsContent>

      <TabsContent value="allPokemon">
        <PreloadQuery query={allPokemonQuery} variables={{ offset: 0, limit: 10 }}>
          {(queryRef) => (
            <Suspense fallback={<Spin className="h-6" loading={true} />}>
              <AllPokemon queryRef={queryRef} />
            </Suspense>
          )}
        </PreloadQuery>
      </TabsContent>
    </Tabs>
  );
}
