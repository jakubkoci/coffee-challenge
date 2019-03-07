FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY run.sh run.sh
COPY .next .next

CMD ["/bin/bash", "-c", "/usr/src/app/run.sh"]

EXPOSE 3000

# Build
# docker build -t coffee-challenge .

# Run
# docker run -t --rm -v $PWD:/usr/src/app -p 3001:3000 coffee-challenge