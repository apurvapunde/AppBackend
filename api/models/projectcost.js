/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** projectcost Schema*/
var DBschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    revenue: { type: Number },
    cost: { type: Number },
    grossProfit: { type: Number },
    overhead: { type: Number },
    netProfit: { type: Number },
    netProfitPercent: { type: Number },
    laborHours: { type: Number },
    labor: { type: Number },
    materials: { type: Number },
    equipment: { type: Number },
    fuel: { type: Number },
    other: { type: Number },
    total: { type: Number },
    currentRevenue: { type: Number },
    currentCost: { type: Number },
    currentGrossProfit: { type: Number },
    currentGrossProfitPercent: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('ProjectCost', DBschema);
