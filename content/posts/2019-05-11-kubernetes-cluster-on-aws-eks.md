---
date: 2019-05-11
title: "Kubernetes cluster on AWS EKS"
template: post
thumbnail: ../thumbnails/kubernetes.png
slug: kubernetes-cluster-on-aws-eks
categories:
  - Kubernetes
  - AWS
  - Ansible
  - Terraform
  - Selenium
  - Popular

tags:
  - k8s
  - Kubernetes
  - AWS
  - EKS
  - Ansible
  - Terraform
  - Selenium
  - WebDriver
---

In this post we are going to see how to set up Kubernetes cluster on AWS EKS.


&nbsp;


Before you start
--
You will need to make sure you have the following components installed and set up before you start with Amazon EKS:

- [AWS CLI](https://aws.amazon.com/cli/) is a tool to manage AWS services.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is for communicating with the Kubernetes cluster API server.
- [AWS IAM Authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)  allow IAM authentication with the Kubernetes cluster.  

&nbsp;

### Installing Tools

The best way to get started on a macOS is to use [Homebrew](https://brew.sh/). If you already have [Homebrew](https://brew.sh/) installed, you can install ```awscli ```, ```kubectl```, and ```aws-iam-authenticator``` by running the following command
```bash
brew install awscli && brew install kubectl && brew install aws-iam-authenticator
```

If you don't already have Homebrew installed, I would strongly recommend that you install it! It's incredibly useful program for installing software dependencies like ```OpenSSL```, ```MySQL```, ```Postgres```, ```Redis```, ```SQLite```, and more.

&nbsp;

#### Configure the AWS CLI

After the AWS CLI has been installed, you’ll need to configure it with your Access Keys, Secrete Keys, regions and outputs. You can start this process by running AWS Configure.
```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

#### Verify ```awscli``` is properly installed.
```bash
aws sts get-caller-identity
```

#### Verify ```kubectl``` is properly installed.
```bash
$ kubectl version -o yaml                                                                       

clientVersion:
  buildDate: "2019-03-01T23:36:43Z"
  compiler: gc
  gitCommit: c27b913fddd1a6c480c229191a087698aa92f0b1
  gitTreeState: clean
  gitVersion: v1.13.4
  goVersion: go1.12
  major: "1"
  minor: "13"
  platform: darwin/amd64
```

#### Verify ```aws-iam-authenticator``` is properly installed.
```bash
$ aws-iam-authenticator help
```


&nbsp;



Creating an EKS policy
--

Now that the tools are setup, we need to set up a new IAM policy for EKS service.

Open the [IAM console](https://console.aws.amazon.com/iam/), select **```Policies```** on the left 


![EKS Policy][1]

Now click on the **```Create policy```** button at the top of the page.


![EKS Policy][2]



From the **```Create policy```** menu, select **```JSON```** and then copy and paste the code below. 


```yaml
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:*"
            ],
            "Resource": "*"
        }
    ]
}
```

![EKS Policy][3]


Now click on ```Review policy```and name it **```AdminEKSPolicy```**


![EKS Policy][4]



We also need CloudFormation access which we can call **```AdminCloudFormationPolicy```**
```yaml
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```


&nbsp;


### Creating an EKS role

Now we need to set up a new IAM role for EKS service.

Open the [IAM console](https://console.aws.amazon.com/iam/), select **```Roles```** on the left 

![EKS Roles][5]


Now click the **```Create Role```** button at the top of the page.


![EKS Roles][6]


From the list of AWS services, select **```EKS```** and then **```Next: Permissions```** at the bottom of the page.


![EKS Roles][7]

We can use the pre-defined EKS role "model" for this role


![EKS Roles][8]


We will call **```AdminEKSRole```** and then **```Create role```** at the bottom of the page.


![EKS Roles][9]


Be sure to note the Role ARN, you will need it when creating the Kubernetes cluster in the steps below.

![EKS Roles][10]


&nbsp;


Create an IAM User
--
We can add policy to our existing users, but it's best to create a separate user for EKS. We will create
two users, a **```ClusterAdmin```** and **```ClusterUser```**.


**```ClusterAdmin```**:
- **```ClusterAdmin```** with the following policies:
  - AdminEKSPolicy
  - AdminCloudFormationPolicy
  - AmazonEKSServicePolicy 
  - AmazonEKSClusterPolicy 
  
  
Open the [IAM console](https://console.aws.amazon.com/iam/), select **```Users```** on the left 


![EKS Roles][11]
![EKS Roles][12]
![EKS Roles][13]


**```ClusterUser```**:
- **```ClusterUser```**
  - no IAM policies
  - k8s admin "system:master" group
  
![EKS Roles][14]
![EKS Roles][15]
![EKS Roles][16]


&nbsp;



Creating a VPC for EKS
--

Next, we’re going to create a separate VPC for our EKS cluster. To do this, we’re going to use a CloudFormation template that contains all the necessary EKS-specific ingredients for setting up the VPC.

Open up [CloudFormation](https://console.aws.amazon.com/cloudformation), and click the Create new stack button.


On the [**Select template**](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) page, enter the URL of the CloudFormation YAML in the relevant section:
```
https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/amazon-eks-vpc-sample.yaml
```

![EKS Roles][17]

Click Next.

![EKS Roles][18]


Give the VPC a name, leave the default network configurations as-is, and click **Next**.


On the Options page, you can leave the default options untouched and then click **Next**.

![EKS Roles][19]


On the Review page, simply hit the **Create** button to create the VPC.

CloudFormation will begin to create the VPC. Once done, be sure to note the various values created — SecurityGroups, VpcId and SubnetIds. You will need these in subsequent steps. You can see these under the Outputs tab of the CloudFormation stack:

![EKS Roles][20]


&nbsp;



Creating the EKS cluster
--

![EKS Roles][21]
![EKS Roles][22]

Now open the Clusters page in the [EKS Console](https://console.aws.amazon.com/eks/):
 
![EKS Roles][23]

Once the status changes to “ACTIVE”, we can proceed with updating our kubeconfig file with the information on the new cluster so kubectl can communicate with it.


To do this, we will use the AWS CLI update-kubeconfig command (be sure to replace the region and cluster name to fit your configurations):
```
aws eks update-kubeconfig --name Selenium
```

We can now test our configurations using the kubectl get svc command:
```
kubectl get svc
 
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.100.0.1   <none>        443/TCP   2m
```

&nbsp;



Launching Kubernetes worker nodes
--

Now that we’ve set up our cluster and VPC networking, we can now launch Kubernetes worker nodes. To do this, we will again use a CloudFormation template.

Open CloudFormation, click **```Create Stack```**, and this time use the following template URL:

```
https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/amazon-eks-nodegroup.yaml
```

For more information visit [Launching Amazon EKS Worker Nodes](https://docs.aws.amazon.com/eks/latest/userguide/launch-workers.html)


![EKS Roles][24]

Clicking **Next**, name your stack, and in the EKS Cluster section enter the following details:

- **ClusterName** – the name of your Kubernetes cluster (e.g. demo)
- **ClusterControlPlaneSecurityGroup** – the same security group you used for creating the cluster in previous step.
- **NodeGroupName** – a name for your node group.
- **NodeAutoScalingGroupMinSize** – leave as-is. The minimum number of nodes that your worker node Auto Scaling group can scale to.
- **NodeAutoScalingGroupDesiredCapacity** – leave as-is. The desired number of nodes to scale to when your stack is created.
- **NodeAutoScalingGroupMaxSize** – leave as-is. The maximum number of nodes that your worker node Auto Scaling group can scale out to.
- **NodeInstanceType** – leave as-is. The instance type used for the worker nodes.
- **NodeImageId** – the Amazon EKS worker node AMI ID for the region you’re using. For us-east-1, for example: ami-0c5b63ec54dd3fc38
- **KeyName** – the name of an Amazon EC2 SSH key pair for connecting with the worker nodes once they launch.
- **BootstrapArguments** – leave empty. This field can be used to pass optional arguments to the worker nodes bootstrap script.
- **VpcId** – enter the ID of the VPC you created in Step 2 above.
- **Subnets** – select the three subnets you created in Step 2 above.

![EKS Roles][25]


Proceed to the Review page, select the check-box at the bottom of the page acknowledging that the stack might create IAM resources, and click **Create**.

CloudFormation creates the worker nodes with the VPC settings we entered — three new EC2 instances are created using the

As before, once the stack is created, open Outputs tab:


![EKS Roles][26]



#### [To enable worker nodes to join your cluster](https://docs.aws.amazon.com/eks/latest/userguide/launch-workers.html)

Download, edit, and apply the AWS IAM Authenticator configuration map.

```bash
curl -O https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-02-11/aws-auth-cm.yaml
```

Open the file and replace the rolearn with the ARN of the NodeInstanceRole created above:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: <ARN of instance role>
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes
```
Save the file and apply the configuration:

```bash
kubectl apply -f aws-auth-cm.yaml
```
You should see the following output:
```
configmap/aws-auth created
```

Use kubectl to check on the status of your worker nodes:
```bash
kubectl get nodes --watch
 
NAME                              STATUS     ROLES     AGE         VERSION
ip-192-168-245-194.ec2.internal   Ready     <none>    <invalid>   v1.11.5
ip-192-168-99-231.ec2.internal    Ready     <none>    <invalid>   v1.11.5
ip-192-168-140-20.ec2.internal    Ready     <none>    <invalid>   v1.11.5
```


&nbsp;



Additional Resources
--
- [Amazon EKS Workshop](https://eksworkshop.com/)


&nbsp;


[1]: ../images/eks/eks-policy-1.png
[2]: ../images/eks/eks-policy-2.png
[3]: ../images/eks/eks-policy-3.png
[4]: ../images/eks/eks-policy-4.png
[5]: ../images/eks/eks-roles-1.png
[6]: ../images/eks/eks-roles-2.png
[7]: ../images/eks/eks-roles-3.png
[8]: ../images/eks/eks-roles-4.png
[9]: ../images/eks/eks-roles-5.png
[10]: ../images/eks/eks-roles-6.png
[11]: ../images/eks/eks-admin-user-1.png
[12]: ../images/eks/eks-admin-user-1.png
[13]: ../images/eks/eks-admin-user-1.png
[14]: ../images/eks/eks-cluster-1.png
[15]: ../images/eks/eks-cluster-1.png
[16]: ../images/eks/eks-cluster-1.png
[17]: ../images/eks/eks-vpc-1.png
[18]: ../images/eks/eks-vpc-2.png
[19]: ../images/eks/eks-vpc-3.png
[20]: ../images/eks/eks-vpc-4.png
[21]: ../images/eks/eks-cluster-1.png
[22]: ../images/eks/eks-cluster-2.png
[23]: ../images/eks/eks-cluster-3.png
[24]: ../images/eks/eks-worker-node-1.png
[24]: ../images/eks/eks-worker-node-2.png
[26]: ../images/eks/eks-worker-node-3.png
[27]: ../images/eks/eks-cluster-user-4.png
[28]: ../images/eks/eks-cluster-user-5.png
[29]: ../images/eks/eks-cluster-user-6.png