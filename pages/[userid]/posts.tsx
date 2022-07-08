import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { Button, Container } from '@chakra-ui/react';
import { User } from 'components/atoms/User';
import { Paginated } from 'components/molecules/Paginated';
import { getPostsByUserPayload } from 'services/UserService';
import { PostsList } from 'components/molecules/PostsList';
import { User as IUser } from 'services/UserService.d';
import { Post as IPost } from 'services/PostService.d';

export const PostsView = () => {
  const { userid = '' } = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser>({} as IUser);

  const nav = (path: string) => {
    window.scrollTo(0, 0);
    router.push(path);
  };

  useEffect(() => {
    if (posts.length) {
      setUser(posts[0].owner);
    }
  }, [posts]);

  return (
    <Container>
      <User {...user}>
        <Button onClick={() => nav('/')}>Return to users list</Button>
      </User>
      <Paginated
        page="Posts"
        elements={posts}
        setElements={setPosts}
        request={(page: number) => getPostsByUserPayload(userid, 5, page)}
      >
        <PostsList posts={posts} />
      </Paginated>
    </Container>
  );
};

export default PostsView;
