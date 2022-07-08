import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Container, Flex, Link, Tag, Text } from '@chakra-ui/react';
import { Post } from 'components/atoms/Post';
import { Paginated } from 'components/molecules/Paginated';
import { getPostsByTagPayload } from 'services/TagService';
import { Post as IPost } from 'services/PostService.d';

export const TagsView: NextPage = () => {
  const { tagname = '' } = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);

  const nav = (path: string) => {
    window.scrollTo(0, 0);
    router.push(path);
  };

  const List = ({ posts }: any) => (
    <Flex flexDirection="column">
      {posts.map((post: any) => (
        <Flex key={post.id} m="10px">
          <Post {...post} action={nav}>
            <Flex justifyContent="end">
              <Text marginX="10px">Owner:</Text>
              <Link onClick={() => nav(`/${post.owner.id}`)} fontWeight="bold">
                {post.owner.firstName} {post.owner.lastName}
              </Link>
            </Flex>
          </Post>
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Container>
      <Flex borderStyle="dashed" flexDirection={['column', 'row']}>
        <Button marginX="10px" onClick={() => nav('/')}>
          Back to users list
        </Button>
        <Flex flexDirection="column" m={['10px 0 0 0', ' 0 0 0 auto']}>
          <Text alignSelf="center">
            Current tag: <Tag fontWeight="bold">{tagname}</Tag>
          </Text>
        </Flex>
      </Flex>
      <Paginated
        page="Tags"
        elements={posts}
        setElements={setPosts}
        request={page => getPostsByTagPayload(tagname, 5, page)}
      >
        <List posts={posts} />
      </Paginated>
    </Container>
  );
};

export default TagsView;
