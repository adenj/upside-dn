import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { supabase } from "../../supabaseClient";
import { useForm, SubmitHandler } from "react-hook-form";

interface AuthFormProps {
  method: "login" | "register";
}

interface FormInputs {
  email: string;
  password: string;
  key?: string;
}

const validationErrors = {
  required: "Required field",
  pattern: "Must be a valid email",
  minLength: "Cannot be less than 4 characters",
  maxLength: "Cannot be more than 100 characters",
};

export const AuthForm = ({ method = "login" }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleSignUp = async (data: FormInputs) => {
    const { email, password, key } = data;
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(
        { email, password },
        {
          data: {
            api_key: key,
            dark_mode: true,
          },
        }
      );
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log({ error, email, password });
      alert(error.error_description || error.mesage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: FormInputs) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log({ error, email, password });
      alert(error.error_description || error.mesage);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log({ data, errors });
    if (method === "login") {
      handleLogin(data);
    }
    if (method === "register") {
      handleSignUp(data);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel fontWeight="bolder">Email</FormLabel>
            <Input
              placeholder="Your email"
              {...register("email", {
                required: true,
                maxLength: 100,
                pattern:
                  // eslint-disable-next-line
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <FormErrorMessage>
              {
                validationErrors[
                  errors.email?.type! as keyof typeof validationErrors
                ]
              }
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel fontWeight="bolder">Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 100,
                minLength: 4,
              })}
            />
            <FormErrorMessage>
              {
                validationErrors[
                  errors.password?.type! as keyof typeof validationErrors
                ]
              }
            </FormErrorMessage>
          </FormControl>
          {method === "register" && (
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel fontWeight="bolder">Up API Key</FormLabel>
              <Input
                placeholder="up:yeah"
                {...register("key", {
                  required: true,
                })}
              />
            </FormControl>
          )}
          <ButtonGroup>
            <Button disabled={loading} type="submit">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
  );
};
