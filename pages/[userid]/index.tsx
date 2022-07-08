import { useNavigate, useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useAxios } from 'utils/useAxios';
import { getUserProfilePayload } from 'services/UserService';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Flex, Spinner, Text } from '@chakra-ui/react';
import { User } from 'components/atoms/User';
import { UserProfile } from 'services/UserService.d';

export const UserDetailsView = () => {
  const router = useRouter();
  const { userid = '' } = useParams();
  const { response, loading, error }: any = useAxios(
    getUserProfilePayload(userid),
  );
  const [user, setUser] = useState<UserProfile>();

  const handleBack = () => {
    router.push('/');
  };

  useEffect(() => {
    if (response) setUser(response);
  }, [response]);

  useEffect(() => {
    if (error) router.push('/page/not/found');
  }, [error]);

  const Details = () => {
    if (loading || !user) {
      return (
        <Flex justifyContent="center" m="20px" gap="1">
          <Spinner />
          <Text marginX="10px">Loading...</Text>
        </Flex>
      );
    }

    return (
      <>
        <User {...user}>
          <Flex flexDirection="column" alignItems="flex-start">
            <Box>Email: {user.email}</Box>
            <Box>Gender: {user.gender}</Box>
            <Box>Phone: {user.phone}</Box>
          </Flex>
        </User>
        <Button onClick={handleBack}>Back to users list</Button>
      </>
    );
  };

  return (
    <Container>
      <Details />
    </Container>
  );
};
