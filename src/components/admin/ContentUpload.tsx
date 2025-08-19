import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../Templates/spark-vision-builds/src/components/ui/tabs';
import ServiceForm from './ServiceForm';
import ProjectForm from './ProjectForm';
import ArticleForm from './ArticleForm';
import PartnerForm from './PartnerForm';
import ContentList from './ContentList';

const ContentUpload = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="mt-6 space-y-8">
          <ServiceForm />
          <ContentList contentType="service" />
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6 space-y-8">
          <ProjectForm />
          <ContentList contentType="project" />
        </TabsContent>

        <TabsContent value="articles" className="mt-6 space-y-8">
          <ArticleForm />
          <ContentList contentType="article" />
        </TabsContent>

        <TabsContent value="partners" className="mt-6 space-y-8">
          <PartnerForm />
          <ContentList contentType="partner" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentUpload;
