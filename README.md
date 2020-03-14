# Airnote

Airnote is a self-destructing notes app that encrypts your secret inside the browser so, secret and decryption password never propagated to the server, only the AES-256 encrypted secret which is destroyed immediately after it's fetched from the server.

![Example](./example.gif)

## Getting Started

### Development

1. Install NPM dependencies

```
npm install
```

2. Run development environment
```
npx next
```

3. Go to `http://127.0.0.1:3000`

### Production

#### Kubernetes

[examples/kubernetes](./examples/kubernetes)

#### Docker Compose, Nginx and automatic Let's Encrypt

[examples/docker-compose-with-nginx-le.yml](./examples/docker-compose-with-nginx-le.yml)

#### Docker image

```
minvs1/airnote
```

## License

[MIT](./LICENSE)
