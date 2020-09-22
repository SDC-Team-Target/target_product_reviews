# System Design Capstone (target_product_reviews)

Scaled an existing appliation by rebuilding the server and database
  
For this project I extended the capabilites of inherited code with a focus of supporting production-level web traffic. After researching PostgreSQL and MongoDB, I chose MongoDB for benchmarking.  Using Compound Indexing, I reduced the find document by keyword query time from 69 to 10 milliseconds. I performed load testing with K6 and analyzed latency and throughput with New Relic. Below are some benchmarks I achieved: 

  * Queries executed in under 50ms

  * Generated and seeded a database with 10m documents

  * Maintained Error rate less than 1% under load


## Technologies:
  * Back end: Express, Node, Mongo DB
  * Load Testing & Benchmarking: K6, New Relic


