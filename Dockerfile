ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}

WORKDIR .
COPY . ./react-ssr

WORKDIR ./react-ssr

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn", "run", "prod"]
