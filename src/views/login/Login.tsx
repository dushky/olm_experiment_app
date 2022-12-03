import React, { useState } from "react";
//material-ui
import { Box, Grid } from "@mui/material";

// graphql
import { LoginInput, useLoginMutation } from "generated/graphql";
import { FetchResult } from "@apollo/client";

// components
import AuthWrapper1 from "ui-components/wrappers/AuthWrapper";
import AuthCardWrapper from "ui-components/wrappers/AuthCardWrapper";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router";

import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [, setCookie] = useCookies(["access_token"]);

  const [user, setUser] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const navigator = useNavigate();

  const [loginMutation] = useLoginMutation();

  const handleSubmitForm = async (values: LoginInput) => {
    setIsSubmitting(true);
    setUser(values);
    toast
      .promise(
        loginMutation({
          variables: {
            login: values,
          },
        }).then((value: FetchResult) => {
          let expires = new Date();
          expires.setTime(
            expires.getTime() + value?.data?.login.expires_in * 1000
          );
          setCookie("access_token", value?.data?.login?.access_token, {
            path: "/",
            expires,
          });
          navigator("/app/dashboard/");
          // forceUpdate()
        }),
        {
          pending: "Loging in",
          success: "Logged in",
          error: "Error with logging in",
        }
      )
      .then((e) => {
        setIsSubmitting(false);
      })
      .catch((e) => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <AuthWrapper1>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "calc(100vh - 68px)" }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <LoginForm
                          user={user}
                          handleSubmitForm={handleSubmitForm}
                          isSubmitting={isSubmitting}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper1>
    </div>
  );
};

export default Login;
