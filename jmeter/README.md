# JMeter: Light Load Test

A small load test for the public Restful Booker API: list bookings, create a booking, then read it back. Each request checks the status code and that the response arrives within 3 seconds.

Restful Booker is a shared practice service, so the default load is intentionally light (5 users, 5 loops, 1 s think time). Don't point heavy load at public services.

## Run it

```bash
# GUI (to view or edit the plan)
jmeter -t jmeter/restful-booker-load-test.jmx

# Command line, with an HTML report
jmeter -n -t jmeter/restful-booker-load-test.jmx \
       -Jusers=5 -Jrampup=10 -Jloops=5 \
       -l jmeter/results/results.jtl -e -o jmeter/results/report
```

## What's in the plan

| Element | Purpose |
|---|---|
| Thread group | Users, ramp-up and loops are set with `-J` properties |
| HTTP Request Defaults | Base host and protocol in one place |
| Header Manager | JSON `Accept` and `Content-Type` headers |
| 3 samplers | `GET /booking`, `POST /booking`, `GET /booking/{id}` |
| JSON Extractor | Saves the new booking id for the next request |
| Response + Duration assertions | Status code and a 3 s response-time limit |
| Constant timer | 1 s think time between requests |

## Reading the results
Open `jmeter/results/report/index.html`. The numbers to check first are **error %**, **90th percentile response time** and **throughput**. The CI pipeline runs a reduced version (3 users, 2 loops) and uploads the report as a build artifact.
