package main

func setupAuth(providers map[string][]string) () {

}

// type Authenticator struct {
// 	*oidc.Provider
// 	oauth2.Config
// }

// // New instantiates the *Authenticator.
// func New() (*Authenticator, error) {
// 	provider, err := oidc.NewProvider(
// 		context.Background(),
// 		"https://"+os.Getenv("AUTH0_DOMAIN")+"/",
// 	)

// 	if err != nil {
// 		return nil, err
// 	}

// 	oauth2Config := oauth2.Config{
// 		ClientID:     os.Getenv("AUTH0_CLIENT_ID"),
// 		ClientSecret: os.Getenv("AUTH0_CLIENT_SECRET"),
// 		RedirectURL:  os.Getenv("AUTH0_CALLBACK_URL"),
// 	}

// 	return &Authenticator{
// 		Provider: provider,
// 		Config:   oauth2Config,
// 	}, nil
// }

// func (a *Authenticator) VerifyIDToken(ctx context.Context, token *oauth2.Token) (*oidc.IDToken, error) {
// 	rawIDToken, ok := token.Extra("id_token").(string)
// 	if !ok {
// 		return nil, errors.New("no id_token field in oauth2 token")
// 	}

// 	oidcConfig := &oidc.Config{
// 		ClientID: a.ClientID,
// 	}

// 	return a.Verifier(oidcConfig).Verify(ctx, rawIDToken)
// }

// func login() {
// 	router := gin.Default()

// 	store := cookie.NewStore([]byte(os.Getenv("AUTH0_CLIENT_SECRET")))
// 	router.Use(sessions.Sessions("auth-session", store))

// 	router.GET("/login", func(ctx *gin.Context) {

// 	})
// }
