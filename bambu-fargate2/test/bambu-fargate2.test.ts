import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as BambuFargate2 from '../lib/bambu-fargate2-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BambuFargate2.BambuFargate2Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
