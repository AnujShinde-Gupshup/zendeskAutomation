const axios = require('axios');

module.exports = { 
    "createOrg" : "createOrg",
    "showGetDomain" : "showGetDomain",
    "listUsers" : "listUsers",
    "listOrgs" : "listOrgs",
}

const headers = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic ZGV2c3VwcG9ydEBndXBzaHVwLmlvL3Rva2VuOjdveDcyQ3AxYWtid0RlbkRWUzgyMjIwZ2JZY1dFRW9iV083bllKWW0=",
    }
};

const baseUrl = `https://gupshup.zendesk.com/api/v2`;

async function createOrg(req,res) {
    let url = `${baseUrl}/organizations.json`;
    let response = '';
    let status = 400;
    const { organizationName, lang, region, batchId, domain, details, notes, partnerId, partnerVertical, groupId, csm } = req.body;
    console.log(req.body);

    if (!organizationName) {
        response = `The parameter organizationName is missing`;
        res.statusCode = status;
        return res.send(response);
    } else if (!lang) {
        response = `The parameter lang is missing`;
        res.statusCode = status;
        return res.send(response);
    } else if (!region) {
        response = `The parameter region is missing`;
        res.statusCode = status;
        return res.send(response);
    } else {
        status = 200;
        response = `The organization ${organizationName} has been created`
    }

    const body = {
        "organization": {
            "name": organizationName,
            "domain_names": [
                `${domain}`
            ],
            "details": details,
            "notes": notes,
            "group_id": parseInt(groupId),
            "tags": [],
            "organization_fields": {
                "csm_name": csm,
                "isv_language": lang,
                "isv_region": region,
                "partner_batch_id": batchId,
                "partner_id": partnerId,
                "partner_vertical": partnerVertical
            }
        }
    };

    axios.post(url, body, headers)
        .then((s) => {
            console.log(s)
            res.statusCode = s.status;
            return res.json({
                orgId: s.data.organization.id,
                message: response
            });
        })
        .catch((e) => {
            res.statusCode = 400;
            return res.send(e);
        })


}