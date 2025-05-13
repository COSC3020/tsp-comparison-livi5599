# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

-----

The length of a Held-Karp tour is always less than or equal to the length of a Local Search tour because Held-Karp is an exact calculation, whereas Local Search gives a more estimated result.

To complete this assignment, I used another student's implementations for TSP Held-Karp and TSP Local Search, as my implementation of Held-Karp isn't fully working yet, and I don't have an implementation of Local Search.  I used ChatGPT to generate matrices of increasing length, which I then used to compare the implementations.  To compare them, I used performance.now() on each matrix for both Held-Karp and Local Search, which returned the runtime in milliseconds.  The graphs given above have the times converted to seconds.  The provided code contains my last test for this assignment (testing Held-Karp in a matrix of 21 cities).  I was unable to get the largest input to a runtime of an hour, but only about 52 minutes when Held-Karp was tested on a matrix of 20 cities.  For some reason when I tested a matrix of 21 cities, I would never get a result, as it would run for almost over a day with nothing returned.

-----

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models.  All of the work is my own, except where stated otherwise.  I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
