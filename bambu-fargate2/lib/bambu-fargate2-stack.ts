/* Maintainer Abdul kadir ali || abdulkadirali.01@gmail.com/devopsali7118@gmail.com || GitHub:- devopsali7118 || LinkedIn:- https://www.linkedin.com/in/abdul-ali-306915174/ */

//AWS Construct Library module imports to the indicated file.


import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class BambuFargate2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

//********************************** IAC for ECS-Fargate with ALb + autoscaling group********************************************



// IAC for VPC,CLUSTER

    const vpc = new ec2.Vpc(this, "MyVpc", {
     maxAzs: 3 // Default is all AZs in region
     });

    const cluster = new ecs.Cluster(this, "MyCluster", {
     vpc: vpc
     });



//IAC for ECS-LoadBalancer
    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'Service', {
	  cluster,
	  memoryLimitMiB: 1024,
	  cpu: 512,
	  taskImageOptions: {
	  image: ecs.ContainerImage.fromRegistry("nginxdemos/hello"),
	   },
          });

// IAC for ECS-Fargate Auto-scaling


    const scalableTarget = loadBalancedFargateService.service.autoScaleTaskCount({
      minCapacity: 4,
      maxCapacity: 20,
      });

    scalableTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
	});

    scalableTarget.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 50,
	});

  }
}
