
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create 4 book genres
  const fiction = await prisma.genre.upsert({
    where: { name: "Fiction" },
    update: {},
    create: { name: "Fiction" },
  });

  const science = await prisma.genre.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" },
  });

  const technology = await prisma.genre.upsert({
    where: { name: "Technology" },
    update: {},
    create: { name: "Technology" },
  });

  const history = await prisma.genre.upsert({
    where: { name: "History" },
    update: {},
    create: { name: "History" },
  });

  // Create at least 15 books
  const books = [
    { title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780000000001", genreId: fiction.id },
    { title: "The River Between", author: "Ngugi wa Thiong'o", isbn: "9780000000002", genreId: fiction.id },
    { title: "Purple Hibiscus", author: "Chimamanda Adichie", isbn: "9780000000003", genreId: fiction.id },
    { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780000000004", genreId: fiction.id },

    { title: "A Brief History of Time", author: "Stephen Hawking", isbn: "9780000000005", genreId: science.id },
    { title: "The Selfish Gene", author: "Richard Dawkins", isbn: "9780000000006", genreId: science.id },
    { title: "Cosmos", author: "Carl Sagan", isbn: "9780000000007", genreId: science.id },
    { title: "The Origin of Species", author: "Charles Darwin", isbn: "9780000000008", genreId: science.id },

    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780000000009", genreId: technology.id },
    { title: "The Pragmatic Programmer", author: "David Thomas", isbn: "9780000000010", genreId: technology.id },
    { title: "Code", author: "Charles Petzold", isbn: "9780000000011", genreId: technology.id },
    { title: "Artificial Intelligence", author: "Elaine Rich", isbn: "9780000000012", genreId: technology.id },

    { title: "A People's History", author: "Howard Zinn", isbn: "9780000000013", genreId: history.id },
    { title: "The History of Kenya", author: "W. R. Ochieng", isbn: "9780000000014", genreId: history.id },
    { title: "The Art of War", author: "Sun Tzu", isbn: "9780000000015", genreId: history.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
  }

  console.log("Successfully seeded 4 genres and 15 books!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
