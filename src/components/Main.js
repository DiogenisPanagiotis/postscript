import React, { Component } from 'react';
import Campaigns from './Campaigns';
import data from '../data';
import '../App.css'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            focus: 'Campaigns',
            create: false,
            campaigns: data.campaigns,
            campaignToEdit: null,
        };
    }

    toggleCreate = () => {
        if (this.state.campaignToEdit) {
            this.setState({
                campaignToEdit: null,
            });
        }
        this.setState({
            create: !this.state.create,
        });
    }

    editCampaign = (campaignID) => {
        this.setState({
            campaignToEdit: campaignID,
        });
        this.toggleCreate();
    }

    renderCreateButton = () => {
        const { focus } = this.props;
        if (!this.state.create) {
            return (
                <div className="create-button" onClick={this.toggleCreate}>Create {focus.slice(0, -1)}</div>
            );
        }
    }

    saveCampaign = (newCampaign, id) => {
            const { campaigns } = this.state;
            const updatedCampaigns = [...campaigns];
            updatedCampaigns[newCampaign.id] = newCampaign;
            if (id) {
                updatedCampaigns[newCampaign.id].id = id;
            }
            this.setState({
                campaigns: updatedCampaigns,
            });
    }

    render() {
        const { focus } = this.props;
        const { create, campaigns, campaignToEdit } = this.state;
        return (
            <div className="main">
                <div className="category">{create ? `${focus} > Create ${focus}` : focus}</div>
                {this.renderCreateButton()}
                <hr />
                <Campaigns 
                    create={create} 
                    toggleCreate={this.toggleCreate}
                    campaigns={campaigns}
                    saveCampaign={this.saveCampaign}
                    editCampaign={this.editCampaign}
                    campaignID={campaignToEdit}
                />
            </div>
        );
    }
}

export default Main;