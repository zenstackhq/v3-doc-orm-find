import { QueryError } from '@zenstackhq/runtime';
import { createClient } from './db';

async function main() {
  const db = await createClient();

  // create some posts for testing
  await db.post.createMany({
    data: [ 
      { id: 1, title: 'Post1', slug: 'post1' },
      { id: 2, title: 'Post2', slug: 'post2', published: true, viewCount: 1 },
  ]})

  // `findMany` reads a list of entities
  console.log(
    await db.post.findMany({ where: { viewCount: { gt: 0 } } })
  );

  // `findUnique` takes unique criteria as input
  // e.g., you can use id field
  console.log(
    await db.post.findUnique({ where: { id: 1 }})
  );
  // or any unique field
  console.log(
    await db.post.findUnique({ where: { slug: 'post1' }})
  )

  // `findFirst` accepts arbitrary filter conditions that don't have
  // to be unique
  console.log(
    await db.post.findFirst({ where: { published: true } })
  );

  // `findUniqueOrThrow` and `findFirstOrThrow` throws an error if
  // no entity is found
  try {
    await db.post.findUniqueOrThrow({ where: { id: 3 } });
  } catch (err) {
    console.log('Got an expected error:', (err as QueryError).message);
  }
}

main();
