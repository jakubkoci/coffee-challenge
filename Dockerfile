FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY run.sh run.sh

CMD ["/bin/bash", "-c", "/usr/src/app/run.sh"]

EXPOSE 8080

# Build
# docker build -t coffee-challenge .

# Run
# docker run -t --rm -v $PWD:/usr/src/app -p 8080:3000 coffee-challenge