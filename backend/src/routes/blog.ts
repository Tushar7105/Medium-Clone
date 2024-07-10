import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify} from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@tushar0715/medium-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  },
  Variables : {
    userId : string
  }
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
        //@ts-ignore
          c.set("userId", user.id);
          await next();
      } else {
          c.status(403);
          return c.json({
              message: "You are not logged in"
          })
      }
  } catch(e) {
      c.status(403);
      return c.json({
          message: "You are not logged in"
      })
  }
});

blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({ error : "Input not Correct"});
    }
    
    const post = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : userId
        }
    });

    return c.json({
        id : post.id
    });

  })
  
blogRouter.put('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({ error : "Input not Correct"});
    }
    await prisma.post.update({
        where : {
            id : body.id,
            authorId : userId
        },
        data : {
            title : body.title,
            content : body.content
        }
    });

    return c.text("Updated the post");
  })

blogRouter.get('/bulk' , async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
          content: true,
          title: true,
          id: true,
          author: {
              select: {
                  name: true
              }
          }
      }
  });
    return c.json({posts});
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma  = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    try{    
        const blog = await prisma.post.findUnique({
            where : {
                id : id
            }
        });
        return c.json(blog)
    }catch(e){
        c.status(403);
        return c.json({error : "Blog not Found"})
    }

  })

