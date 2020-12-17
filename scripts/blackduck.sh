#!/bin/bash
set -eo pipefail

bash <(curl -s -L https://detect.synopsys.com/detect.sh) \
    --detect.source.path="${WORKSPACE}/ui-tools/modules/$1" \
    --detect.yarn.prod.only=true \
    --detect.project.name="github.com/repaygithub/ui-tools" \
    --detect.project.version.name="master" \
    --detect.code.location.name="ui-tools" \
    --detect.project.version.phase="RELEASED" \
    --blackduck.url="https://repay.blackducksoftware.com" \
    --blackduck.api.token=${BLACKDUCK_TOKEN} \
    --detect.project.version.distribution=SAAS \
    --detect.cleanup=true \
    --detect.tools.excluded=SIGNATURE_SCAN \
    --detect.excluded.detector.types=MAVEN