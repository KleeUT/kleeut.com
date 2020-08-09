I have recently rebuilt my personal website in Gatsby, previously it was hand coded HTML and CSS.

I didn't want to build the artifacts on my machine and manually upload the files into S3. I've done this before and it always feels fragile and poorly documented.

Gatsby being data driven static site generator I wanted to be able to update the data, push the code into Github, and have the output delivered into AWS S3 without me having to remember to do anything.

Github Actions are a way that I can get this behaviour going for free without having to set up accounts and integrations outside of Github.

# What is a Github Action?

Actions are code that are run in relation to events associated with a Github repository. These can do a whole host of things to help automate workflows around interactions on a git repository.

A common use case, and the one I'm looking at, is setting up a Continuous Integration (CI) and Continuous Delivery (CD) pipeline. I figure this is a great chance for me to play around with Github Actions for the first tme.

# Adding a actions to the repo

Actions are configured using `yaml` files in the `/github/workflows` folder.

Each of these files represents one Action that can be triggered by an event in Github. Each Action can have more multiple Jobs which can have multiple steps
In my case I'd like to start with running the build and test steps on all branches with the deploy on master only.

To achieve this I've split the process into two Jobs. The first runs all the build and package steps. The second does the deployment.

# Adding the build Job

Adding the build Job is relatively straight forward. It's one Job with a series of steps to install Node modules, run linting, prettier and build Gatsby.

## Using Node.js

The first thing to do is to make sure that the correct version of Node.js is available. This can be done by using the [setup-node Github Action](https://github.com/actions/setup-node).

```yaml
steps:
  - uses: actions/checkout@v2 # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
  - uses: actions/setup-node@v2-beta
    with:
      node-version: "12"
```

## Install, Test, Build and, Lint

The install, test, build and, lint steps all make use of scripts that are set up in the `package.json` file.

```yaml
- name: NPM Install
  run: npm install
# - name: Run Jest #:( WHy no tests klee
#   run: npm test
- name: Run Lint
  run: npm run lint
- name: Run Prettier
  run: npm run prettier:check
- name: Gatsby Build
  run: npm run build
```

## Store the compiled files

Once the build step is done the built output needs to be accessible to the release job. To do this I bundle the completed artifacts into a zipped archive in one step and then upload that artifact to build artifacts using the action supplied by Github in the next step. This artifact is then available to download and to be used by subsequent Jobs.

```yaml
- name: zip build resulit
  run: tar -czvf build.tar.gz public
- name: archive zip
  uses: actions/upload-artifact@v2
  with:
    name: build
    path: build.tar.gz
```

# Adding the deploy Job

## Chaining the jobs

By default the two Jobs will run asynchronously. To get the 2nd Job to actually come second it needs to explicitly be configured to depend on the completion of the first one. This is done using the aptly named `needs` property with an array of the Jobs that need to complete before this Job can run.
In my case it looks like:

```yaml
deploy:
  needs:
    - build
```

## Get the artifacts

To download the artifacts from the I'm using the download artifacts action `actions/download-artifact@v2` then extracting the files from the archive to make it available to the upload step.

```yaml
- name: download artifact
  uses: actions/download-artifact@v2
  with:
    name: build
- name: extract build
  run: tar -xzvf build.tar.gz
```

## Uploading to S3

I'm using 2 Steps to get the contents of the archive into AWS S3 so that it can be served to the public.

### Configure AWS SDK

AWS provide an action to configure the AWS CLI on an agent so that it can be used in subsequent steps.

```yaml
- name: Set AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ${{ secrets.AWS_DEFAULT_REGION }}
```

This step requires that secrets about the AWS account are available. These are made available by uploading through the Github console. Once uploaded these secrets are available in the Action.
![Github secrets configuration](https://dev-to-uploads.s3.amazonaws.com/i/a915qf6qew179o77e18e.png)

### Upload using AWS CLI

The final step in the process is to synchronize the output of the api with the S3 bucket.

```yaml
- name: Deploy to S3
  run: aws s3 sync ./public s3://kleeut.com --acl public-read
```

With this every commit builds and publishes to AWS. This is awesome but I don't want every branch push blowing away the code deployed from the `main` branch.

## Limiting the deploy Job to the _main_ branch

To limit the execution of a Job onto a single branch Github Actions provides the `if` property on Jobs. This allows me to provide a conditional statement that determines if the job should be run. In this case:

```yaml
if: github.ref == 'refs/heads/main'
```

This executes only if the current branch is the `main` branch.

With this my target CI/CD system for this website was set up. I"m able to build the codebase, run linting, and if I wasn't so lazy tests against each branch. The compiled output is available to download so I can test the branch code before merging it into `main` and when the code is merged into `main` it deploys into S3 without me needing to do anything.

# Final Thoughts

I'm a bit late to the party but Github actions are a great tool. The fact that they are free (to a point) for projects developed in the open means that I don't have an excuse not to be including CI and CD as part of my build process for every silly little side project that I take on.

---

The code for all of this can be found in the [kleeut.com repo on Github](https://github.com/KleeUT/kleeut.com)
