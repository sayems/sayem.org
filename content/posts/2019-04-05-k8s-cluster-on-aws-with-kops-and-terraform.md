---
date: 2019-04-05
title: "Kubernetes cluster on AWS with kops and Terraform"
template: post
thumbnail: ../thumbnails/kubernetes.png
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
  - Ansible
  - Terraform
  - Selenium
  - WebDriver
---

In this post we are going to see how to create Kubernetes cluster on AWS with kops and Terraform.

Prerequisite
--
- [AWS CLI](https://github.com/sayems/kubernetes.resources/wiki/AWS-Command-Line-Interface-(CLI))
- [Terraform](https://github.com/sayems/terraform.resources#table-of-contents)



&nbsp;

Install kops on MacOS:
--
Homebrew makes installing ```kops``` very simple for MacOS.
```
brew update && brew install kops
```
Master can also be installed via Homebrew very easily:
```
# HEAD of master
brew update && brew install kops --HEAD
```
Previously we could also ship development updates to homebrew but their policy has changed.

Note: if you already have kops installed, you need to substitute upgrade for install.

You can switch between installed releases with:
```
brew switch kops 1.9.0
brew switch kops 1.10.0
```

&nbsp;


Start Kubernetes cluster
--

##### Clone this github repo:
```
https://github.com/sayems/kubernetes.resources.git
```

And then, navigate to ```Kubernetes``` directory

```
cd /kubernetes.resources/Kubernetes
```

&nbsp;

##### Create an Amazon S3 Bucket

Login to AWS and create a S3 bucket with the following information:
  - Bucket name: ```sayem.io```
  - Region: ```US East (N. Virginia)```
  - When you get to ```Edit public access settings for selected buckets``` Uncheck all the boxes.

&nbsp;

##### Creating a Public Hosted Zone

After you done with Create an Amazon S3 bucket, go to Route53
- Create a hostzone with public domain name: ```sayem.io```

and then, copy nameserver to ```text-editor``` and remove ```.``` from end of the line
```
ns-250.awsdns-31.com.
ns-809.awsdns-37.net.
ns-1374.awsdns-43.org.
ns-1880.awsdns-43.co.uk.
```

##### Configure NameCheap Custom DNS Server

1. Sign into your [NameCheap](https://www.namecheap.com/myaccount/login/) account
2. Select **Domain List** from the left sidebar and click the **Manage** button next to your domain in the list:
3. Find the **Nameservers** section and select **Custom DNS** from the drop-down menu. After that, copy and paste the following info the Nameserver field :
```
ns-250.awsdns-31.com.
ns-809.awsdns-37.net.
ns-1374.awsdns-43.org.
ns-1880.awsdns-43.co.uk.
```

&nbsp;


Now, open your terminal and run the following command:

```
$ kops create cluster \
  --name=sayem.io \
  --state=s3://sayem.io \
  --authorization RBAC \
  --zones=us-east-1c \
  --node-count=2 \
  --node-size=t2.micro \
  --master-size=t2.micro \
  --master-count=1 \
  --dns-zone=sayem.io \
  --out=selenium_terraform \
  --target=terraform \
  --ssh-public-key=~/.ssh/id_rsa.pub
 ```
Output 
```
I0228 12:07:04.120853   32105 create_cluster.go:1407] Using SSH public key: /Users/sidrah/.ssh/id_rsa.pub
I0228 12:07:04.548887   32105 create_cluster.go:496] Inferred --cloud=aws from zone "us-east-1c"
I0228 12:07:04.695125   32105 subnets.go:184] Assigned CIDR 172.20.32.0/19 to subnet us-east-1c
I0228 12:07:06.435198   32105 executor.go:103] Tasks: 0 done / 73 total; 31 can run
I0228 12:07:06.438375   32105 dnszone.go:242] Check for existing route53 zone to re-use with name "sidrah.me"
I0228 12:07:06.499566   32105 dnszone.go:249] Existing zone "sidrah.me." found; will configure TF to reuse
I0228 12:07:06.904775   32105 vfs_castore.go:736] Issuing new certificate: "ca"
I0228 12:07:06.968443   32105 vfs_castore.go:736] Issuing new certificate: "apiserver-aggregator-ca"
I0228 12:07:07.519671   32105 executor.go:103] Tasks: 31 done / 73 total; 24 can run
I0228 12:07:07.817854   32105 vfs_castore.go:736] Issuing new certificate: "apiserver-aggregator"
I0228 12:07:07.843762   32105 vfs_castore.go:736] Issuing new certificate: "kube-controller-manager"
I0228 12:07:07.870238   32105 vfs_castore.go:736] Issuing new certificate: "kube-scheduler"
I0228 12:07:07.872003   32105 vfs_castore.go:736] Issuing new certificate: "kops"
I0228 12:07:07.904013   32105 vfs_castore.go:736] Issuing new certificate: "kubecfg"
I0228 12:07:07.928800   32105 vfs_castore.go:736] Issuing new certificate: "master"
I0228 12:07:07.930574   32105 vfs_castore.go:736] Issuing new certificate: "kube-proxy"
I0228 12:07:07.954220   32105 vfs_castore.go:736] Issuing new certificate: "apiserver-proxy-client"
I0228 12:07:08.055811   32105 vfs_castore.go:736] Issuing new certificate: "kubelet"
I0228 12:07:08.169553   32105 vfs_castore.go:736] Issuing new certificate: "kubelet-api"
I0228 12:07:08.443569   32105 executor.go:103] Tasks: 55 done / 73 total; 16 can run
I0228 12:07:08.676014   32105 executor.go:103] Tasks: 71 done / 73 total; 2 can run
I0228 12:07:08.676494   32105 executor.go:103] Tasks: 73 done / 73 total; 0 can run
I0228 12:07:08.682273   32105 target.go:312] Terraform output is in selenium_terraform
I0228 12:07:08.750928   32105 update_cluster.go:290] Exporting kubecfg for cluster
kops has set your kubectl context to sidrah.me

Terraform output has been placed into selenium_terraform
Run these commands to apply the configuration:
   cd selenium_terraform
   terraform plan
   terraform apply

Suggestions:
 * validate cluster: kops validate cluster
 * list nodes: kubectl get nodes --show-labels
 * ssh to the master: ssh -i ~/.ssh/id_rsa admin@api.sidrah.me
 * the admin user is specific to Debian. If not using Debian please use the appropriate user based on your OS.
 * read about installing addons at: https://github.com/kubernetes/kops/blob/master/docs/addons.md.
```

You can now use the ```tree``` command to see all the file that has been created 
```
.
└── selenium_terraform
    ├── data
    │   ├── aws_iam_role_masters.sidrah.me_policy
    │   ├── aws_iam_role_nodes.sidrah.me_policy
    │   ├── aws_iam_role_policy_masters.sidrah.me_policy
    │   ├── aws_iam_role_policy_nodes.sidrah.me_policy
    │   ├── aws_key_pair_kubernetes.sidrah.me-46b275cab9fc882ee2d4cd43304ddbe7_public_key
    │   ├── aws_launch_configuration_master-us-east-1c.masters.sidrah.me_user_data
    │   └── aws_launch_configuration_nodes.sidrah.me_user_data
    └── kubernetes.tf

2 directories, 8 files
```

##### Initialize terraform

You must run ```terraform init``` and ```terraform apply``` commands while in the ```selenium_terraform``` directory:

```
$ cd selenium_terraform
$ terraform init
```
Output after running ```terraform init```
```
Terraform has been successfully initialized!
```
Now, run ```terraform apply```
```
$ terraform apply
```
You'll be prompted to accept or reject action after running ```terraform apply```

```
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes
```
```
aws_ebs_volume.c-etcd-main-sidrah-me: Creating...
```
You should see the final message
```
Apply complete! Resources: 35 added, 0 changed, 0 destroyed.

Outputs:

cluster_name = kops.sidrah.me
master_autoscaling_group_ids = [
    master-us-east-1c.masters.kops.sidrah.me
]
master_security_group_ids = [
    sg-0f543215262522ba20
]
masters_role_arn = arn:aws:iam::543215262522:role/masters.kops.sidrah.me
masters_role_name = masters.kops.sidrah.me
node_autoscaling_group_ids = [
    nodes.kops.sidrah.me
]
node_security_group_ids = [
    sg-0f543215262522ba20
]
node_subnet_ids = [
    subnet-0f543215262522ba20
]
nodes_role_arn = arn:aws:iam::0f543215262522ba20:role/nodes.kops.sidrah.me
nodes_role_name = nodes.kops.sidrah.me
region = us-east-1
route_table_public_id = rtb-0f543215262522ba20
subnet_us-east-1c_id = subnet-0f543215262522ba20
vpc_cidr_block = 172.20.0.0/16
vpc_id = vpc-0f543215262522ba20
```

Now, wait for kubernetes cluster to be ready. This might take an hour to complete.

You can verify the cluster by checking the nodes. Run the following command to list all the connected nodes: 
```
kubectl get nodes
```
```
NAME                            STATUS   ROLES    AGE   VERSION
ip-172-20-34-204.ec2.internal   Ready    master   17m   v1.11.6
ip-172-20-38-165.ec2.internal   Ready    node     16m   v1.11.6
ip-172-20-58-138.ec2.internal   Ready    node     16m   v1.11.6
```

Don't worry, If you get the error message below, you just need to few more minutes to complete.
```
Unable to connect to the server: dial tcp: lookup api.k8s.example on 0.0.0.0:53: no such host
```

&nbsp;


Kubernetes Deployment
--
Let's deploy a simple static site using NGINX to our Kubernetes cluster, 

###### To process deployment you need to create two files:
- ```deployment_file.yaml```
- ```index.html```

[All materials are provided here](https://github.com/sayems/kubernetes.resources/wiki/NGINX-Deployment-materials) to create two files

Create configmap
```
kubectl create configmap nginx-content --from-file=/Users/sayem/Kubernetes/nginx/data/index.html
```
```
configmap/nginx-content created
```
Get configmap
```
kubectl get configmap
```
```
NAME            DATA   AGE
nginx-content   1      10s
```
Delete configmap
```
kubectl delete configmap nginx-content
```
```
configmap "nginx-content" deleted
```

Now, run the following command to deploy NGINX on kubernetes cluster
```
kubectl create -f deployment_file.yaml
```
```
deployment.apps/nginx-deployment created
service/nginx-deployment-service created
```

Now, run
```
kubectl get deploy,svc,pod,configmap
```
```
NAME                                     DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/nginx-deployment   10        10        10           10          1m

NAME                               TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/kubernetes                 ClusterIP   100.64.0.1     <none>        443/TCP        1h
service/nginx-deployment-service   NodePort    100.66.43.96   <none>        80:30773/TCP   1m

NAME                                    READY   STATUS    RESTARTS   AGE
pod/nginx-deployment-5bd44978f6-2268w   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-44pr8   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-cg4tf   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-dwc7j   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-fv2dh   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-hcd77   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-mn55l   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-w9ljl   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-wln5m   1/1     Running   0          1m
pod/nginx-deployment-5bd44978f6-xs6wx   1/1     Running   0          1m

NAME                      DATA   AGE
configmap/nginx-content   1      8m
```

Open your browser and navigate to ```http://[ EC2 Node Public IP ]:30773/``` You'll see NGINX server is up and running on port ```30773```

You might have to add entry to ``` Kubernetes node``` Inbound security group

```
Type             Protocol   Port Range     Source      Description
Custom TCP Rule  TCP        30773          0.0.0.0/0
```

&nbsp;

### Deployment to Kubernetes with Helm

We have deployed our application using ```kubectl```. Now we'll look at how to deploy our applications on Kubernetes cluster using [Helm](https://helm.sh/). [Helm](https://helm.sh/) is a package manager for Kubernetes that allows developers deploy applications on Kubernetes clusters. 

```
$ kubectl create serviceaccount --namespace kube-system tiller

serviceaccount/tiller created
```
```
$ kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

clusterrolebinding.rbac.authorization.k8s.io/tiller-cluster-rule created
```
```
$ helm init --service-account tiller --upgrade

$HELM_HOME has been configured at /Users/sidrah/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.

Please note: by default, Tiller is deployed with an insecure 'allow unauthenticated users' policy.
To prevent this, run `helm init` with the --tiller-tls-verify flag.
For more information on securing your installation see: https://docs.helm.sh/using_helm/#securing-your-helm-installation
Happy Helming!
```

Now, run the following command
```
$ kubectl get pods -n kube-system
```
```
NAME                                                   READY   STATUS    RESTARTS   AGE
tiller-deploy-57c574bfb8-2f7zw                         1/1     Running   0          2m
```
```
$ kubectl get pods -n kube-system | grep tiller --color
```
```
tiller-deploy-57c574bfb8-2f7zw                         1/1     Running   0          3m
```

&nbsp;

##### Selenium Grid installation
```
helm install --name selenium-grid stable/selenium \
--set chromeDebug.enabled=true \
--set firefoxDebug.enabled=true
```
```
NAME:   selenium-grid
LAST DEPLOYED: Sat Mar  2 19:01:06 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/Pod(related)
NAME                                                   READY  STATUS             RESTARTS  AGE
selenium-grid-selenium-chrome-debug-679d8444c8-nvr4q   0/1    Pending            0         0s
selenium-grid-selenium-firefox-debug-5ddd687df8-fb78t  0/1    Pending            0         0s
selenium-grid-selenium-hub-6c8549fb59-m56sn            0/1    ContainerCreating  0         0s

==> v1/Service
NAME                        TYPE          CLUSTER-IP    EXTERNAL-IP  PORT(S)         AGE
selenium-grid-selenium-hub  LoadBalancer  100.67.61.28  <pending>    4444:32738/TCP  0s

==> v1beta1/Deployment
NAME                                  READY  UP-TO-DATE  AVAILABLE  AGE
selenium-grid-selenium-chrome-debug   0/1    1           0          0s
selenium-grid-selenium-firefox-debug  0/1    1           0          0s
selenium-grid-selenium-hub            0/1    1           0          0s
```

Selenium hub will automatically start-up using port 4444 by default. You can view the status of the hub by opening a browser window and navigating to: ```http://[EC2 PublicIP]:32738/grid/console```

For more information on how to run tests on Selenium Grid, please visit this [link](https://github.com/sayems/selenium.grid)


&nbsp;

Destroy Kubernetes cluster
--
```
$ terraform destroy
```
```
Destroy complete! Resources: 35 destroyed.
```

For more information, please visit this [link](https://github.com/sayems/terraform.resources)

&nbsp;

