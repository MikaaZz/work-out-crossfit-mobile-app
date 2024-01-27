import { PrismaClient, User } from "@prisma/client";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const prisma = new PrismaClient();

async function createUser() {
  await prisma.user.create({
    data: {
      uid: "123",
      name: "Alice",
      email: "",
    },
  });
}

async function listUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const users = await listUsers();
    setUsers(users);
  };

  fetchUsers();

  return (
    <View>
      <Text>Tela de teste</Text>
      {users.map((user) => (
        <Text key={user.uid}>{user.name}</Text>
      ))}
      <Button
        title="Clique aqui"
        onPress={() =>
          createUser()
            .then(async () => {
              await prisma.$disconnect();
            })
            .catch(async (e) => {
              console.error(e);
              await prisma.$disconnect();
              process.exit(1);
            })
        }
      />
    </View>
  );
};
